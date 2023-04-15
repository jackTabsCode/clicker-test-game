import {component} from "@rbxts/matter"

export const Test = component<{}>("Test")
export const Model = component<{model: PVInstance}>("Model")
export const Transform = component<{cframe: CFrame; doNotReconcile?: true}>("Transform")
export const Person = component<{clickCount: number}>("Person")
export const UpDown = component<{up: boolean}>("UpDown")
