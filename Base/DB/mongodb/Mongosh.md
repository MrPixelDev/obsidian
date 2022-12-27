[Install Mongosh](https://www.mongodb.com/docs/mongodb-shell/install/)

## Connect to deployment

## Local MongoDB Instance on Default Port[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#local-mongodb-instance-on-default-port "Permalink to this heading")

Run `mongosh` without any command-line options to connect to a MongoDB instance running on your **localhost** with **default port** 27017:

```
mongosh
```

This is equivalent to the following command:

```
mongosh "mongodb://localhost:27017"
```

## Local MongoDB Instance on a Non-Default Port[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#local-mongodb-instance-on-a-non-default-port "Permalink to this heading")

To specify a port to connect to on localhost, you can use:

-   A [connection string.](https://www.mongodb.com/docs/manual/reference/connection-string/)
    
    ## EXAMPLE
    
    To connect to a MongoDB instance running on localhost with a non-default port 28015:
    
    ```
    mongosh "mongodb://localhost:28015"
    ```
    
-   The command-line option `--port`.
    
    ## EXAMPLE
    
    To connect to a MongoDB instance running on localhost with a non-default port 28015:
    
    ```
    mongosh --port 28015
    ```
    

## MongoDB Instance on a Remote Host[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#mongodb-instance-on-a-remote-host "Permalink to this heading")

To specify a remote host and port, you can use:

-   A [connection string.](https://www.mongodb.com/docs/manual/reference/connection-string/)
    
    ## EXAMPLE
    
    To connect to a MongoDB instance running on a remote host on port 28015:
    
    ```
    mongosh "mongodb://mongodb0.example.com:28015"
    ```
    
    ## NOTE
    
    ### Connecting to Atlas
    
    If your remote host is a MongoDB Atlas cluster, you can copy your connection string from the Atlas UI. To learn more, see [Connect to a Cluster.](https://www.mongodb.com/docs/atlas/connect-to-cluster/#use-the-connect-dialog-to-connect-to-your-cluster)
    
-   The command-line options `--host` and `--port`. If you do not include the `--port` option, `mongosh` uses the **default port** 27017.
    
    ## EXAMPLE
    
    To connect to a MongoDB instance running on a remote host on port 28015:
    
    ```
    mongosh --host mongodb0.example.com --port 28015
    ```
    

## Connection Options[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#connection-options "Permalink to this heading")

### Connect with Authentication[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#connect-with-authentication "Permalink to this heading")

To connect to a MongoDB instance requires authentication, use the `--username` and `--authenticationDatabase` command-line options. `mongosh` prompts you for a password, which it masks as you type.

## EXAMPLE

To connect to a remote MongoDB instance and authenticate against the `admin` database as user `alice`:

```
mongosh "mongodb://mongodb0.example.com:28015" --username alice --authenticationDatabase admin
```

## NOTE

To provide a password with the command instead of using the masked prompt, you can use the `--password` option.

## TIP

### See also:

-   [Enable Access Control](https://www.mongodb.com/docs/manual/tutorial/enable-authentication/) to enforce authentication.
    
-   Add [Database Users](https://www.mongodb.com/docs/manual/core/security-users/) to provide authenticated access to a MongoDB instance.
    

### Connect to a Replica Set[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#connect-to-a-replica-set "Permalink to this heading")

To connect to a replica set:

-   If you are using the [DNS Seedlist Connection Format](https://www.mongodb.com/docs/manual/reference/connection-string/#dns-seedlist-connection-format), you can include the `+srv` modifier in your connection string.
    
    ## EXAMPLE
    
    ```
    mongosh "mongodb+srv://server.example.com/"
    ```
    
    ## NOTE
    
    Using the `+srv` connection string modifier automatically sets the [tls option](https://www.mongodb.com/docs/manual/reference/connection-string/#urioption.tls) to `true` for the connection. You can override this behavior by explicitly setting `tls` to `false`.
    
-   You can specify the replica set name and members in the [connection string.](https://www.mongodb.com/docs/manual/reference/connection-string/)
    
    ## EXAMPLE
    
    To connect to a three-member replica set named `replA`:
    
    ```
    mongosh "mongodb://mongodb0.example.com.local:27017,mongodb1.example.com.local:27017,mongodb2.example.com.local:27017/?replicaSet=replA"
    ```
    

## NOTE

`mongosh` adds the `directConnection=true` query parameter to the connection string automatically unless at least one of the following is true:

-   The `replicaSet` query parameter is present in the connection string.
    
-   The connection string uses the `mongodb+srv://` scheme.
    
-   The connection string contains a seed list with multiple hosts.
    

### Connect using TLS[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#connect-using-tls "Permalink to this heading")

For `tls` connections:

-   If you are using the [DNS Seedlist Connection Format](https://www.mongodb.com/docs/manual/reference/connection-string/#dns-seedlist-connection-format), the `+srv` connection string modifier automatically sets the `tls` option to `true` for the connection:
    
    ## EXAMPLE
    
    To connect to a DNS seedlist-defined replica set with `tls` enabled:
    
    ```
    mongosh "mongodb+srv://server.example.com/"
    ```
    
-   You can use the [tls option](https://www.mongodb.com/docs/manual/reference/connection-string/#urioption.tls) to set `tls=true` in the [connection string:](https://www.mongodb.com/docs/manual/reference/connection-string/)
    
    ## EXAMPLE
    
    To enable `tls` in the connection string:
    
    ```
    mongosh "mongodb://mongodb0.example.com:28015/?tls=true"
    ```
    
-   You can specify the `--tls` command-line option.
    
    ## EXAMPLE
    
    To connect to a remote host with `tls` enabled:
    
    ```
    mongosh "mongodb://mongodb0.example.com:28015" --tls
    ```
    

### Connect to a Specific Database[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#connect-to-a-specific-database "Permalink to this heading")

To connect to a specific database, specify a database in your [connection string URI path](https://www.mongodb.com/docs/manual/reference/connection-string/) If you do not specify a database in your URI path, you connect to a database named `test`.

## EXAMPLE

The following connection string URI connects to database `db1`.

```
mongosh "mongodb://localhost:27017/db1"
```

## Connect to a Different Deployment[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#connect-to-a-different-deployment "Permalink to this heading")

You can use the [`Mongo()`](https://www.mongodb.com/docs/manual/reference/method/Mongo/#mongodb-method-Mongo) or the [connect()](https://www.mongodb.com/docs/manual/reference/method/connect/) methods to connect to a different MongoDB deployment from within the MongoDB Shell.

To learn how to connect to a different deployment using these methods, see [Open a New Connection.](https://www.mongodb.com/docs/mongodb-shell/write-scripts/#std-label-mdb-shell-open-new-connections-in-shell)

## Verify Current Connection[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#verify-current-connection "Permalink to this heading")

Use the [`db.getMongo()`](https://www.mongodb.com/docs/manual/reference/method/db.getMongo/#mongodb-method-db.getMongo) method to verify your current database connection.

The method returns the [connection string URI](https://www.mongodb.com/docs/manual/reference/connection-string/) for your current connection.

## Disconnect from a Deployment[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#disconnect-from-a-deployment "Permalink to this heading")

To disconnect from a deployment and exit `mongosh`, you can:

-   Type `.exit`, `exit`, or `exit()`.
    
-   Type `quit` or `quit()`.
    
-   Press `Ctrl` + `D`.
    
-   Press `Ctrl` + `C` twice.
    

## Limitations[![](https://www.mongodb.com/docs/mongodb-shell/assets/link.svg)](https://www.mongodb.com/docs/mongodb-shell/connect/#limitations "Permalink to this heading")

-   [Kerberos authentication](https://www.mongodb.com/docs/manual/core/kerberos/) does not permit `authMechanismProperties=CANONICALIZE_HOST_NAME:true|false` in the connection string. Use one of: `authMechanismProperties=CANONICALIZE_HOST_NAME:forward|forwardAndReverse|none` instead.
    
-   `mongosh` currently only supports the `zlib` [compressor](https://www.mongodb.com/docs/manual/core/wiredtiger/#compression). The following compressors are not supported:
    
    -   `zstd`
        
    -   `snappy`


## Configure mongosh

Learn how to configure `mongosh` behaviors and user experience:

-   [Use an Editor for Commands](https://www.mongodb.com/docs/mongodb-shell/reference/editor-mode/#std-label-mongosh-editor-mode)
    
-   [Configure Settings](https://www.mongodb.com/docs/mongodb-shell/reference/configure-shell-settings/#std-label-mongosh-shell-settings)
    
-   [Customize the](https://www.mongodb.com/docs/mongodb-shell/reference/customize-prompt/#std-label-customize-the-mongosh-prompt) [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) Prompt
    
-   [Configure Telemetry Options](https://www.mongodb.com/docs/mongodb-shell/telemetry/#std-label-telemetry)
    
-   [Configure Free Monitoring](https://www.mongodb.com/docs/mongodb-shell/free-monitoring/#std-label-free-monitoring-mongosh)

