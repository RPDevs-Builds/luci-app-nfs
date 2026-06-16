# luci-app-nfs

A modern LuCI application for managing the NFS (Network File System) kernel server on OpenWrt. This application provides a user-friendly web interface for configuring NFS v3 and v4 exports, bridging the gap between LuCI and the native Linux NFS configuration.

## Features

- **UCI Managed**: All settings are stored in `/etc/config/nfs`, allowing for consistent management via LuCI, CLI, or automation scripts.
- **Unified Init Script**: A custom `/etc/init.d/nfsd` script handles the translation of UCI configuration to the native `/etc/exports` file and manages the underlying NFS daemons.
- **NFS v3 & v4 Support**: Easily toggle between NFS v3 and v4, or enable both simultaneously.
- **Flexible Export Management**:
  - Define shared directory paths.
  - Specify allowed clients (IP addresses, subnets, or wildcards).
  - Customize export options (e.g., `rw`, `sync`, `no_root_squash`).
- **Modern UI**: Built using the latest LuCI JavaScript API for a responsive and native look and feel.

## Installation

### Prerequisites

Ensure you have the NFS kernel server packages installed:

```bash
# For OpenWrt v26 (using apk)
apk add --update-cache nfs-kernel-server kmod-fs-nfs nfs-utils

# For older versions (using opkg)
opkg update
opkg install nfs-kernel-server kmod-fs-nfs nfs-utils
```

### Installing luci-app-nfs

Download the latest `.ipk` or `.apk` package from the [Releases](https://github.com/RPDevs-Builds/luci-app-nfs/releases) page and install it:

#### Using APK (OpenWrt v26+)
```bash
apk add luci-app-nfs_1.0-r1.apk
```

#### Using OPKG (Older versions)
```bash
opkg install luci-app-nfs_1.0-1_all.ipk
```

## Configuration

The application settings are stored in `/etc/config/nfs`.

### Global Settings

- `enabled`: Enable or disable the NFS server.
- `nfs_v3`: Enable NFS v3 support.
- `nfs_v4`: Enable NFS v4 support.

### Share Configuration

Each share is defined as a `config share` section:

```uci
config share
    option path '/mnt/sda1'
    option clients '*'
    option options 'rw,sync,no_subtree_check'
```

## Building from Source

This project includes a GitHub Actions workflow for building packages using `self-hosted` runners.

1.  Clone the repository.
2.  Ensure your local runner is configured with the OpenWrt SDK.
3.  Push changes to `main` to trigger the build.
4.  Download artifacts from the Actions run summary.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the Apache License, Version 2.0. See the [Makefile](nfs/luci-app-nfs/Makefile) for details.

---
*Created and maintained by [Gemini CLI](https://github.com/google/gemini-cli).*
