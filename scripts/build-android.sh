#!/bin/bash

set -e

echo "========================================="
echo " React Native Android Release Builder"
echo "========================================="

# Move to project root if script is inside scripts folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# Ensure Android SDK is available: if local.properties missing, try to detect SDK and write it
if [ ! -f "$PROJECT_ROOT/android/local.properties" ]; then
  echo "\nChecking for Android SDK..."
  SDK_DIR=""

  # If user provided path as first arg, prefer it
  if [ -n "$1" ]; then
    SDK_DIR="$1"
  fi

  if [ -z "$SDK_DIR" ]; then
    if [ -n "$ANDROID_SDK_ROOT" ]; then
      SDK_DIR="$ANDROID_SDK_ROOT"
    elif [ -n "$ANDROID_HOME" ]; then
      SDK_DIR="$ANDROID_HOME"
    fi
  fi

  # Common macOS/Linux SDK locations
  if [ -z "$SDK_DIR" ]; then
    if [ -d "$HOME/Library/Android/sdk" ]; then
      SDK_DIR="$HOME/Library/Android/sdk"
    elif [ -d "$HOME/Android/Sdk" ]; then
      SDK_DIR="$HOME/Android/Sdk"
    elif [ -d "/usr/local/share/android-sdk" ]; then
      SDK_DIR="/usr/local/share/android-sdk"
    fi
  fi

  # Validate SDK_DIR: must contain platform-tools or platforms
  is_valid_sdk() {
    [ -d "$1/platform-tools" ] || [ -d "$1/platforms" ]
  }

  if [ -n "$SDK_DIR" ] && is_valid_sdk "$SDK_DIR"; then
    echo "Found Android SDK at: $SDK_DIR"
    echo "sdk.dir=$SDK_DIR" > "$PROJECT_ROOT/android/local.properties"
    echo "Wrote android/local.properties"
  else
    echo "\nERROR: Android SDK not found automatically."
    echo "You can provide the SDK path as the first argument to this script, create android/local.properties manually, or enter the path now."
    echo "Common SDK locations: $HOME/Library/Android/sdk or $HOME/Android/Sdk"

    # If stdin is a terminal, prompt the user up to 3 times
    if [ -t 0 ]; then
      attempts=0
      while [ $attempts -lt 3 ]; do
        attempts=$((attempts + 1))
        printf "Enter Android SDK path (or leave blank to cancel): "
        read user_path
        # allow user to cancel
        if [ -z "$user_path" ]; then
          echo "Cancelled by user. Exiting."
          exit 1
        fi
        if [ -d "$user_path" ] && is_valid_sdk "$user_path"; then
          SDK_DIR="$user_path"
          echo "sdk.dir=$SDK_DIR" > "$PROJECT_ROOT/android/local.properties"
          echo "Wrote android/local.properties"
          break
        else
          echo "Path doesn't look like an Android SDK (missing platform-tools/platforms). Try again."
        fi
      done
      if [ -z "$SDK_DIR" ]; then
        echo "Failed to obtain valid SDK path after $attempts attempts. Exiting."
        exit 1
      fi
    else
      echo "Non-interactive shell: please set ANDROID_HOME or pass SDK path as argument. Example:"
      echo "  sh scripts/build-android.sh \"$HOME/Library/Android/sdk\""
      exit 1
    fi
  fi
fi

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
