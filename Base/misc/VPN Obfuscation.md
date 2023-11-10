#openvpn #wireguard #shadowsocks

# [Errande](https://errande.com/)

Everything about Linux, Networking, and Raspberry Pi.

![cover image about Wireguard with shadowsocks](https://errande.com/2021/07/obfuscate-wireguard/header.png)

## Hide your VPN traffic: Obfuscate Wireguard with Shadowsocks Tunnel

Posted on July 11, 2021 by bhat

**Wireguard** sure is nice. It is both easy to use and has quite good network performance. It is almost unambiguously better than its predecessor, OpenVPN. Moreover, Wireguard is already deployed everywhere (yes, [Cloudflare Warp](https://blog.cloudflare.com/1111-warp-better-vpn/) is pure Wireguard).

So, what’s the problem? If Wireguard is so good, just use a Wireguard VPN everywhere, and you can forget about leaking your IP addresses or being DDoSed.

Besides the miniature network latency impact, there is a simple problem: Wireguard traffic can be easily identified.

## Wireguard traffic: Easily identifiable?

Sometimes, my Wireguard traffic will get instantly disconnected when I attempted to use my VPN in a school WiFi. I often thought that the VPN server was broken and spent hours debugging it. While in fact, the school firewall detected VPN connection and dropped it.

Believe it or not, hiding Wireguard traffic, or “obfuscating”, is not the focus point of Wireguard. Wireguard website specifically stated that [“Obfuscation should happen at a layer above Wireguard”](https://www.wireguard.com/known-limitations/). It is kind of counter-intuitive, as Wireguard uses `Chacha20-Poly1305` cipher, making obfuscation easy.

In fact, it is trivially easy to filter Wireguard from all traffic. The network tool _Wireshark_ already has Wireguard identification support [in its source code](https://github.com/wireshark/wireshark/blob/dcc02b1003fb923a9eac439f28ae7c5329ea2580/epan/dissectors/packet-wireguard.c). If anyone with Wireshark can do it, it is not hard to imagine corporate or school network intentionally filtering out Wireguard VPN traffic (_GFW wink wink_).

Yes, residential ISP should not intentionally filter out VPN traffic. But that does not stop them from deliberately slowing down Wireguard traffic with all those UDP traffic priority crap.

_Moreover, isn’t it better if the ISP does not know you are using a VPN at all?_

## Great, how to hide my Wireguard traffic?

With some help from our old friend: `shadowsocks`. According to its front page, _Shadowsocks_ is only a lightweight proxy.

However, this _lightweight proxy_ supports tunneling TCP and UDP traffic, with AEAD ciphers for providing confidentiality. It is perfect for hiding our Wireguard UDP traffic, and is proven to circumvent the strongest censorship currently possible.

## Installing Shadowsocks

Since your server provides Wireguard, I assume it runs Linux.

If your server runs Debian or Ubuntu,

```sh
sudo apt install shadowsocks-libev
```

If your servers runs Arch Linux or Manjaro,

```sh
sudo pacman -S shadowsocks-libev
```

Also, install `shadowsocks` on your local computer, using the same procedure as before.

If your computer runs macOS,

```sh
brew install shadowsocks-libev
```

## Run Shadowsocks on your server

After installing it, create `shadowsocks` server’s config file with the following content, and name it as `wg-tun.json`.

```json
{
    "server": "0.0.0.0",
    "server_port": <desired port>,
    "password": "<desired password>",
    "timeout": 300,
    "method": "chacha20-ietf-poly1305",
    "mode": "tcp_and_udp"
}
```

Here, `<desired port>` is the server port listened by shadowsocks. `<desired password>` is a secret password for authenticating shadowsocks connections.

Then, run shadowsocks server on your Wireguard server by executing

```sh
ss-server -c wg-tun.json
```

## Tunnel Wireguard

Create `shadowsocks` tunnel’s config file on your local computer with the following content as `wg-tun.json`.

```json
{
  "server": "<Wireguard server's IP address>",
  "server_port": <server port>,
  "local_address": "0.0.0.0",
  "local_port": 5634,
  "password": "<server password>",
  "timeout": 300,
  "method": "chacha20-ietf-poly1305",
  "mode": "tcp_and_udp",
  "tunnel_address": "127.0.0.1:<Wireguard server's port>"
}
```

Here, `<server port>` and `<server password>` are from last step.

`<Wireguard server's IP address>` is your shadowsocks server’s IP. Since we are hosting Wireguard and shadowsocks on the same server, they should be identical.

`<Wireguard server's port>` is `ListenPort` of Wireguard server.

Then, run `shadowsocks` tunnel on your local computer by executing

```sh
ss-tunnel -c wg-tun.json
```

## Config Wireguard to use the tunnel

Open your Wireguard client’s config.

In section `[Peer]`, change value of entry `Endpoint` into `127.0.0.1:5634`, the local Wireguard endpoint tunneled through `shadowsocks`.

![example config file in my Wireguard client on macOS](https://errande.com/2021/07/obfuscate-wireguard/macos-example.png)

Restart your Wireguard client. Now all your Wireguard traffic are hidden from ISPs!

## My Wireguard still gets randomly disconnected

Welp, we only hid Wireguard traffic’s characteristics, such as handshaking packets. Even after shadowsocks, your hidden VPN connection still uses UDP. It is possible that your network unconditionally filters out UDP traffic for _unethical_ reasons such as “UDP stresses the network out”.

It is still solvable. There are ways to use a fake TCP connection to carry out UDP packets. However, that is for another time. For hiding your Wireguard VPN traffic from the ISP, `shadowsocks` is more than good enough.

-   [WIREGUARD](https://errande.com/tags/wireguard/)
-   [SHADOWSOCKS](https://errande.com/tags/shadowsocks/)
-   [VPN](https://errande.com/tags/vpn/)
-   [NETWORKING](https://errande.com/tags/networking/)