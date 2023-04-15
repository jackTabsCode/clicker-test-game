import {useEvent, World} from "@rbxts/matter"
import {Players, ReplicatedStorage} from "@rbxts/services"
import * as Components from "shared/components"

type ComponentName = keyof typeof Components
type ComponentConstructor = (typeof Components)[ComponentName]
type ComponentType = Parameters<ComponentConstructor>[0] | object

const REPLICATED_COMPONENT_NAMES: readonly ComponentName[] = ["Model", "Transform", "Person"]

const replicatedComponents: ReadonlySet<ComponentConstructor> = REPLICATED_COMPONENT_NAMES.reduce(
	(set: Set<ComponentConstructor>, name: ComponentName) => {
		return set.add(Components[name])
	},
	new Set()
)

function replication(world: World) {
	for (const [_, player] of useEvent(Players, "PlayerAdded")) {
		const payload = new Map<string, Map<ComponentName, {data?: ComponentType}>>()

		for (const [entityId, entityData] of world) {
			const entityPayload = new Map<ComponentName, {data?: ComponentType}>()
			payload.set(tostring(entityId), entityPayload)

			for (const [component, componentData] of entityData) {
				if (replicatedComponents.has(component)) {
					entityPayload.set(tostring(component) as ComponentName, {
						data: componentData
					})
				}
			}
		}

		print(`sending initial payload to ${player.Name}`)
		ReplicatedStorage.matterRemote.FireClient(player, payload)
	}

	const changes = new Map<string, Map<ComponentName, {data?: ComponentType}>>()
	for (const component of replicatedComponents) {
		// Here we are certain that the component has the name of one of our
		// components since it came from our set.
		const name = tostring(component) as ComponentName

		for (const [id, record] of world.queryChanged(component)) {
			const key = tostring(id)

			if (!changes.has(key)) {
				changes.set(key, new Map())
			}

			if (world.contains(id)) {
				changes.get(key)?.set(name, {data: record.new})
			}
		}
	}

	if (!changes.isEmpty()) {
		ReplicatedStorage.matterRemote.FireAllClients(changes)
	}
}

export = {system: replication, priority: math.huge}
