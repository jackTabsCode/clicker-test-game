import {World} from "@rbxts/matter"
import {Transform, UpDown} from "shared/components"

function moveUpDowns(world: World) {
	for (const [entityId, upDownRecord] of world.queryChanged(UpDown)) {
		const transform = world.get(entityId, Transform)
		if (!transform) continue

		if (!upDownRecord.new) continue

		world.insert(
			entityId,
			transform.patch({
				cframe: transform.cframe.add(new Vector3(0, upDownRecord.new.up ? 1 : -1, 0))
			})
		)
	}
}

export = moveUpDowns
