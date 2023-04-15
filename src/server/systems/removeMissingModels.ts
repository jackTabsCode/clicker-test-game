import {useEvent, World} from "@rbxts/matter"
import {Model} from "shared/components"

function removeMissingModels(world: World) {
	for (const [entityId, model] of world.query(Model)) {
		for (const _ of useEvent(model.model, "AncestryChanged")) {
			print("ancestry changed")
			if (!model.model.IsDescendantOf(game)) {
				print("removing")
				world.remove(entityId, Model)
				break
			}
		}
		if (!model.model) world.remove(entityId, Model)
	}

	for (const [entityId, modelRecord] of world.queryChanged(Model)) {
		if (!modelRecord.new && modelRecord.old?.model) {
			modelRecord.old.model.Destroy()
		}
	}
}

export = removeMissingModels
