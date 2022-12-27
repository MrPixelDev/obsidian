#linux #debian #alias

# [How to create a permanent Bash alias on Linux/Unix](https://www.cyberciti.biz/faq/create-permanent-bash-alias-linux-unix/)

Ineed to create a bash shell alias named update as follows:  
**alias update='sudo -- sh -c "/root/bin/chk_disk && dnf update'**  
However, this update alias gets removed after I reboot the Fedora Linux box. How do I create a permanent Bash alias on a Fedora Linux or Unix-like system?  
  
You need to put bash shell aliases in the [~/.bashrc file ($HOME/.bashrc)](https://bash.cyberciti.biz/guide/.bashrc) file executed by bash for non-login shells. On most modern Linux distros, you may want to put all your bash alias definitions into a separate file like ~/.bash_aliases, instead of adding them in the ~/.bashrc file directly. This tutorial shows how to create and add aliases permanently to your bash shell on Linux and Unix-like systems.  


## Steps to create a permanent Bash alias:

Open the Terminal app and then type the following commands:

1.  Edit the ~/.bash_aliases or ~/.bashrc (recommended) file using a text editor:  
    `vi ~/.bash_aliases   # or #   nano ~/.bashrc`
2.  Append your bash alias
3.  For example append:  
    `alias update='sudo yum update'`
4.  Save and close the file.
5.  Activate alias by typing the following [source command](https://bash.cyberciti.biz/guide/Source_command?utm_source=Linux_Unix_Command&utm_medium=faq&utm_campaign=nixcmd "Source command - Linux Bash Shell Scripting Tutorial Wiki"):  
    `source ~/.bash_aliases`

**WARNING!** Please note that ~/.bash_aliases file only works if the following line presents in the ~/.bashrc file:

if [ -f ~/.bash_aliases ]; then
. ~/.bash_aliases
fi

Are above lines are missing in your ~/.bashrc file? Just append at the end of the ~/.bashrc, using a text editor such as vi/vim or joe. See [~/.bash_aliases](https://bash.cyberciti.biz/guide/~/.bash_aliases) wiki page for more info.

[![Linux and Unix Create a Permanent Bash Alias](https://www.cyberciti.biz/media/new/faq/2017/12/Linux-and-Unix-Create-a-Permanent-Bash-Alias.jpg)](https://www.cyberciti.biz/media/new/faq/2017/12/Linux-and-Unix-Create-a-Permanent-Bash-Alias.jpg)

## Examples

Let us create four aliases as follows:  
`$ vi ~/.bash_aliases`  
OR  
`$ joe ~/.bashrc`  
Append text:

# update our debian/ubuntu box
alias update='sudo -- sh -c "apt update && apt upgrade"'
 
# make grep output colorful 
alias grep='grep --color=auto'
 
# set eth0 as an interface for eth0  
alias vnstat='vnstat -i eth0'
 
# flush redis cache for wp
alias flush_redis='redis-cli -h 127.0.0.1 FLUSHDB'

Save and close the file.

### How to load aliases

All new aliases will be available next time you login using a new ssh/terminal session. To load changes immediately, type the following [source command](https://bash.cyberciti.biz/guide/Source_command?utm_source=Linux_Unix_Command&utm_medium=faq&utm_campaign=nixcmd "Source command - Linux Bash Shell Scripting Tutorial Wiki"):  
`$ source ~/.bash_aliases`  
OR  
`$ . ~/.bash_aliases`

### How to list all of my aliases

To list all aliases, run:  
`$ alias`  
Sample outputs:

alias flush_redis='redis-cli -h 127.0.0.1 FLUSHDB'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
alias update='sudo -- sh -c "apt update && apt upgrade"'
alias vnstat='vnstat -i eth0'

### How to use/call aliases

Just type alias name:  
`$ update   $ vnstat   $ flush_redis`

### Removing bash aliases

To remove given alias from the list of defined aliases, try the unalias command:  
`unalias alias_name   unalias c`  
Delete alias definitions by passing the -a as follows:  
`unalias -a`