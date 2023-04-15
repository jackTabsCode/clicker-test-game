import {ReplicatedStorage} from "@rbxts/services"
import {start} from "shared/start"

start([ReplicatedStorage.FindFirstChild("TS")!.FindFirstChild("systems")!, script.Parent!.FindFirstChild("systems")!])
