# luci-app-nfs

LuCI support for Kernel NFS server management.

## Description
This package provides a LuCI web interface to configure the native OpenWrt NFS kernel server. It acts as a configuration wrapper that bridges UCI settings to the standard `/etc/exports` and `/etc/nfs.conf` files.

## Features
*   **UCI Integration**: Manage NFS shares and global settings via `/etc/config/nfs`.
*   **Version Support**: Toggle support for NFSv3 and NFSv4.
*   **Pure Wrapper Architecture**: Does not modify or replace the default system `nfsd` init script.
*   **Observability**: Integrated log viewer with fallback to `dmesg` for kernel-level NFS events.
*   **Advanced Settings**: Configure worker threads, custom ports, and transport protocols (TCP/UDP).

## Installation

### APK (OpenWrt v26+)
```bash
apk add --allow-untrusted luci-app-nfs
```

### IPK (Legacy)
```bash
opkg install luci-app-nfs_*.ipk
```

## Configuration
The application manages the following system files:
*   `/etc/config/nfs` (UCI configuration)
*   `/etc/exports` (NFS exports)
*   `/etc/nfs.conf` (NFS server settings)

## Build from Source
The build process is automated via GitHub Actions, producing both APK v3 (ADB) and IPK artifacts.

```bash
# Manual package generation
tar -cvzf luci-app-nfs.tar.gz -C source/luci-app-nfs .
```

## License
Apache-2.0
