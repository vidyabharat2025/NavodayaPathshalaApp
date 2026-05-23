#!/bin/bash

set -e

echo "========================================="
echo " React Native Android Release Builder"
echo "========================================="

# Move to project root if script is inside scripts folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo ""
echo "1. Installing dependencies..."
npm install

echo ""
echo "2. Creating assets directory..."
mkdir -p android/app/src/main/assets

echo ""
echo "3. Generating React Native bundle..."

npx react-native-asset

npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res
echo ""
echo "4. Cleaning old Android build..."
cd android
./gradlew clean

echo ""
echo "5. Building Release APK..."
./gradlew assembleRelease

APK_PATH="app/build/outputs/apk/release/app-release.apk"

echo ""
echo "========================================="
echo " BUILD SUCCESSFUL"
echo "========================================="

if [ -f "$APK_PATH" ]; then
    echo ""
    echo "APK Generated Successfully:"
    echo ""
    echo "$(pwd)/$APK_PATH"
    echo ""
else
    echo "APK not found!"
    exit 1
fi
