import {AnySystem, Debugger, Loop, World} from "@rbxts/matter"
import Plasma from "@rbxts/plasma"
import {RunService, UserInputService} from "@rbxts/services"
import {start as startReplication} from "shared/replication"

export function start(systemsFolders: Instance[]) {
	const matterDebugger = new Debugger(Plasma)
	const widgets = matterDebugger.getWidgets()

	const world = new World()
	const state: State = {
		debugEnabled: false
	}
	const loop = new Loop(world, state, widgets)

	matterDebugger.autoInitialize(loop)

	const systems: AnySystem[] = []
	for (const systemsFolder of systemsFolders) {
		for (const child of systemsFolder.GetChildren()) {
			if (child.IsA("ModuleScript")) systems.push(require(child) as AnySystem)
		}
	}

	loop.scheduleSystems(systems)

	loop.begin({
		default: RunService.Heartbeat
	})

	UserInputService.InputBegan.Connect(input => {
		if (input.KeyCode === Enum.KeyCode.F4) matterDebugger.toggle()
	})

	if (RunService.IsClient()) {
		startReplication(world, state)
	}
}
