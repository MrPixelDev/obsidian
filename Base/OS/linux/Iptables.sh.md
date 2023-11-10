#iptables #sh 

###
### clean
###

sudo iptables -F && sudo iptables -t nat -F && sudo iptables -t mangle -F

###
### localnet
###

sudo iptables -A INPUT -s 192.168.0.0/24 -j ACCEPT
sudo iptables -A OUTPUT -d 192.168.0.0/24 -j ACCEPT
sudo iptables -A INPUT -s 192.168.1.0/24 -j ACCEPT
sudo iptables -A OUTPUT -d 192.168.1.0/24 -j ACCEPT
sudo iptables -A INPUT -s 192.168.8.0/24 -j ACCEPT
sudo iptables -A OUTPUT -d 192.168.8.0/24 -j ACCEPT

###
### loopback
###

sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A OUTPUT -o lo -j ACCEPT

###
### DNS OpenDNS
###

sudo iptables -A INPUT -s 208.67.220.220 -j ACCEPT
sudo iptables -A OUTPUT -d 208.67.220.220 -j ACCEPT
sudo iptables -A INPUT -s 208.67.220.222 -j ACCEPT
sudo iptables -A OUTPUT -d 208.67.220.222 -j ACCEPT
sudo iptables -A INPUT -s 208.67.222.222 -j ACCEPT
sudo iptables -A OUTPUT -d 208.67.222.222 -j ACCEPT
sudo iptables -A INPUT -s 208.67.222.220 -j ACCEPT
sudo iptables -A OUTPUT -d 208.67.222.220 -j ACCEPT

###
### Ports
###

sudo iptables -A OUTPUT -p udp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p udp --sport 443 -j ACCEPT
sudo iptables -A OUTPUT -p udp --dport 1194 -j ACCEPT
sudo iptables -A INPUT -p udp --sport 1194 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --sport 443 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --dport 1194 -j ACCEPT
sudo iptables -A INPUT -p tcp --sport 1194 -j ACCEPT

###
### IPs
###

sudo iptables -A INPUT -s 0.0.0.0 -j ACCEPT
sudo iptables -A OUTPUT -d 0.0.0.0 -j ACCEPT

###
### tun
###

sudo iptables -A OUTPUT -o tun0 -j ACCEPT
sudo iptables -A INPUT -i tun0 -j ACCEPT

###
### DROP
###

sudo iptables -P INPUT DROP
sudo iptables -P OUTPUT DROP
sudo iptables -P FORWARD DROP

###
### IPv6 DROP
###

sudo ip6tables -F && sudo iptables -t nat -F && sudo iptables -t mangle -F
sudo ip6tables -P INPUT DROP
sudo ip6tables -P OUTPUT DROP
sudo ip6tables -P FORWARD DROP
