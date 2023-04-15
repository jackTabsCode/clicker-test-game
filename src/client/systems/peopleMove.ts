import {useThrottle, World} from "@rbxts/matter"
import {Person, UpDown} from "shared/components"

function peopleMove(world: World) {
	for (const [entityId] of world.query(Person).without(UpDown)) {
		world.insert(entityId, UpDown({up: false}))
	}

	if (useThrottle(1)) {
		for (const [entityId, upDown] of world.query(UpDown, Person)) {
			world.insert(entityId, upDown.patch({up: !upDown.up}))
		}
	}
}

export = peopleMove
