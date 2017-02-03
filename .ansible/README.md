# Prepare ansible roles

    ansible-galaxy install --role-file=roles.yml --roles-path=./roles --force

# DEV env

    vagrant provision

# TEST env

    ansible-playbook project.yml --ask-sudo-pass --inventory inventories/inventory_test -vvvv --ask-pass
    
# PROD env

    # dry run first
    ANSIBLE_ROLES_PATH=./roles/galaxy_roles ansible-playbook project.yml --ask-sudo-pass --inventory inventories/inventory_prod -vvvv --ask-pass --check
    ANSIBLE_ROLES_PATH=./roles/galaxy_roles ansible-playbook project.yml --ask-sudo-pass --inventory inventories/inventory_prod -vvvv --ask-pass
    


### Troubleshooting

    fatal: [default] => Using a SSH password instead of a key is not possible because Host Key checking is enabled and sshpass does not support this.  Please add this host's fingerprint to your known_hosts file to manage this host.

    Solution: Copy the ssh passphrase to known host OR sudo ssh <server>
