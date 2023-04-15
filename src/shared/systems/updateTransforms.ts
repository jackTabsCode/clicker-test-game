import {World} from "@rbxts/matter"
import {Model, Transform} from "shared/components"

function updateTransforms(world: World) {
	// Handle Transform added/changed to existing entity with Model
	for (const [id, transformRecord] of world.queryChanged(Transform)) {
		if (!world.contains(id)) continue

		const model = world.get(id, Model)
		if (!model) continue

		if (transformRecord.new && !transformRecord.new.doNotReconcile) {
			model.model.PivotTo(transformRecord.new.cframe)
		}
	}

	// Handle Model added/changed on existing entity with Transform
	for (const [id, modelRecord] of world.queryChanged(Model)) {
		if (!world.contains(id)) continue

		const transform = world.get(id, Transform)
		if (!transform) continue

		if (modelRecord.new) {
			modelRecord.new.model.PivotTo(transform.cframe)
		}
	}
}

export = updateTransforms
