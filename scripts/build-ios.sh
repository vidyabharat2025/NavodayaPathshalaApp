#!/usr/bin/env bash

set -e

echo "========================================="
echo " React Native iOS JSBundle Builder"
echo "========================================="

# Move to project root if script is inside scripts folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

IOS_BUNDLE_PATH="$PROJECT_ROOT/ios/main.jsbundle"
ENTRY_FILE="index.js"
PLATFORM="ios"

echo "\n1. Installing dependencies (if needed)..."
npm install

echo "\n2. Ensuring ios directory exists..."
mkdir -p "$PROJECT_ROOT/ios"

echo "\n3. Generating React Native bundle for iOS..."

if command -v yarn >/dev/null 2>&1; then
  echo "Using yarn react-native bundle"
  yarn react-native bundle \
    --platform $PLATFORM \
    --dev false \
    --entry-file $ENTRY_FILE \
    --bundle-output "$IOS_BUNDLE_PATH" \
    --assets-dest "$PROJECT_ROOT/ios"
else
  echo "Using npx react-native bundle"
  npx react-native bundle \
    --platform $PLATFORM \
    --dev false \
    --entry-file $ENTRY_FILE \
    --bundle-output "$IOS_BUNDLE_PATH" \
    --assets-dest "$PROJECT_ROOT/ios"
fi

echo "\nBundle created at: $IOS_BUNDLE_PATH"
echo "If you want this file included in your Xcode build, ensure the file is added to the Xcode project or copied by a build phase."

echo "========================================="
