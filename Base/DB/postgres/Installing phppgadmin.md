#phppgadmin #apache2 #postgres #linux 

sudo apt-get install -y  phppgadmin apache2

## Configure PostgreSQL  

By default, **PostgreSQL accepts the authentication from localhost only**. If you want to connect PostgreSQL from external machines, you would need to edit the **pg_hba.conf** file.

**### PostgreSQL 11 ###**

`sudo nano /etc/postgresql/11/main/pg_hba.conf

**### PostgreSQL 10 ###**

`sudo nano /etc/postgresql/10/main/pg_hba.conf

Enter the value as per your requirements in IPv4 and make sure it accepts the md5 password.

# IPv4 local connections:
```
host    all             all             127.0.0.1/32            md5

**host    all             all             192.168.1.0/24          md5**
```
## Configure phpPgAdmin

Edit **/etc/phppgadmin/config.inc.php** file.

`sudo nano /etc/phppgadmin/config.inc.php

Add your PostgreSQL instances here.
```

// Display name for the server on the login screen
$conf['servers'][0]['desc'] = '**PostgreSQL 11**';

// Hostname or IP address for server.  Use '' for UNIX domain socket.
// use 'localhost' for TCP/IP connection on this computer
$conf['servers'][0]['host'] = '**localhost**';


// Database port on server (5432 is the PostgreSQL default)
$conf['servers'][0]['port'] = **5432**;
```

**phpPgAdmin won’t allow users with no password or certain usernames (pgsql, postgres, root, administrator) to log in.**

To override this extra security, change it to false.

``$conf['extra_login_security'] = **false**;

**Setting this true simply hide other users databases from the database list.** However, they can get the data (from other databases) using SQL queries.

``$conf['owned_only'] = **false**;

## Configure Apache

Due to restriction, phpPgAdmin is accessible only on localhost. If you want to access phpPgAdmin web interface from external machines, then you need to edit the apache configuration (phppgadmin.conf) file.

`sudo nano /etc/apache2/conf-enabled/phppgadmin.conf

Default config will look like below.

```
Alias /phppgadmin /usr/share/phppgadmin

<Directory /usr/share/phppgadmin>

<IfModule mod_dir.c>
DirectoryIndex index.php
</IfModule>
AllowOverride None

**# Only allow connections from localhost:**
**Require local**

<IfModule mod_php.c>
  php_flag magic_quotes_gpc Off
  php_flag track_vars On
  #php_value include_path .
</IfModule>
<IfModule !mod_php.c>
  <IfModule mod_actions.c>
    <IfModule mod_cgi.c>
      AddType application/x-httpd-php .php
      Action application/x-httpd-php /cgi-bin/php
    </IfModule>
    <IfModule mod_cgid.c>
     AddType application/x-httpd-php .php
     Action application/x-httpd-php /cgi-bin/php
    </IfModule>
  </IfModule>
</IfModule>

</Directory>
```

Please comment out the **Require local** line and add **Require all granted** just below to the commented line.

It will look like below.

```
Alias /phppgadmin /usr/share/phppgadmin

<Directory /usr/share/phppgadmin>

<IfModule mod_dir.c>
DirectoryIndex index.php
</IfModule>
AllowOverride None

**# Only allow connections from localhost:**
**# Require local**
**Require all granted**
<IfModule mod_php.c>
  php_flag magic_quotes_gpc Off
  php_flag track_vars On
  #php_value include_path .
</IfModule>
<IfModule !mod_php.c>
  <IfModule mod_actions.c>
    <IfModule mod_cgi.c>
       AddType application/x-httpd-php .php
       Action application/x-httpd-php /cgi-bin/php
    </IfModule>
    <IfModule mod_cgid.c>
       AddType application/x-httpd-php .php
       Action application/x-httpd-php /cgi-bin/php
    </IfModule>
   </IfModule>
</IfModule>

</Directory
```

Restart the services.

`sudo systemctl restart postgresql
`sudo systemctl restart apache2


## Access phpPgAdmin

Now access the phpPgAdmin from your web browser, URL will be

http://your-ip-address/phppgadmin

**OR:**

http://localhost/phppgamin