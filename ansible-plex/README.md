# Ansible for Rasbperry Pi 4 (Ubuntu 22.04 x64)

## Preparation

1. Download `Raspberry Pi Imager`
    1. Link: https://www.raspberrypi.com/software/
2. Select `Ubuntu 22.04 x64`
3. Set additional params before **Write**
    1. SSH username and password
    2. Provide a SSH public key
4. Format to NTFS (https://askubuntu.com/q/164728)
    1. Linux: `sudo mkfs -t ntfs /dev/sda1`

## Expectations

- Rasbperry Pi 4
- Ubuntu 22.04 x64
- USB external disk in NTFS

## Before
Configure an **inventory.yaml** file.

1. Formatting the USB to NTFS
2. Label the USB disk
3. Install an Ansible collection

```
$ lsblk -f                                               # List of block device
$ sudo mkfs.ntfs --fast --label "usb_external" /dev/sda1 # Format and add label
$ ansible-galaxy collection install ansible.posix        # Install collection
```

## Set up

- `-k, --ask-pass`: ask for connection password
- `-K, --ask-become-pass`: ask for privilege escalation password

```
$ ansible-playbook playbook.yaml -K
```

## Local debug
```
$ vagrant up
```

## Reference

- https://github.com/notfoundsam/raspberry-plex-ansible
