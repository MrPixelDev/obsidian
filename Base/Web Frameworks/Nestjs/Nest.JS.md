#nest #js #ts #backend 

sudo npm i -g @nestjs/cli
nest new project-name

main.ts:

```
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
const PORT = process.env.PORT || 5000;
const app = await NestFactory.create(AppModule);
await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
```
appModule.ts:

```
@Module({
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
```

appController.ts:
```
@Controller("/api")
export class AppController {
constructor(private appService: AppService) {}

@Get("/users")
getUsers() {
return this.appService.getUsers();
}
}
```

appService.ts:
```
@Injectable()
export class AppService {

getUsers() {
return [{ id: 1, username: "Oleg" }];
}
}
```