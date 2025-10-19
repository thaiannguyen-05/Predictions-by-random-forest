import { Module } from "@nestjs/common";
import { StockModule } from "src/modules/stock/stock.module";
import { TaskScheduleService } from "./task-schedule.service";

@Module({
	imports: [StockModule],
	providers: [TaskScheduleService]
})
export class TaslScheduleModule {
	
}