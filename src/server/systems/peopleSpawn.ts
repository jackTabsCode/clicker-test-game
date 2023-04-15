import {DebugWidgets, World} from "@rbxts/matter"
import {ReplicatedStorage, Workspace} from "@rbxts/services"
import {Model, Person, Transform} from "shared/components"

function peopleSpawn(world: World, state: State, widgets: DebugWidgets) {
	let count = 0
	for (const [entityId, person] of world.query(Person)) {
		count++

		if (!world.get(entityId, Model) || !world.get(entityId, Transform)) world.remove(entityId, Person, Transform)
	}

	for (const i of $range(99, count, -1)) {
		const location = new CFrame(math.random(-100, 100), 10, math.random(-100, 100)).mul(
			CFrame.Angles(0, math.random() * math.pi * 2, 0)
		)
		const person = ReplicatedStorage.assets.person.Clone()
		person.Parent = Workspace

		world.spawn(Person({clickCount: 0}), Transform({cframe: location}), Model({model: person}))
	}
}

export = peopleSpawn
