# Ansible for personal server (Ubuntu 22.04 x64)

## Expectations

- Ubuntu 22.04 x64

## Set up

```
$ ansible-playbook playbook.yaml -K
```

- `-k, --ask-pass`: ask for connection password
- `-K, --ask-become-pass`: ask for privilege escalation password

First time use `-K`

## Local debug

```
$ vagrant up
```
