import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlackService } from './slack.service';
const { App } = require('@slack/bolt');

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SlackService],
})
export class AppModule {

  constructor(private slackService: SlackService) {

  }

  initSlackEvents(receiver: any) {
    const boltApp = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      receiver
    });
    this.slackService.initSlackCommand(boltApp);
  }
}
