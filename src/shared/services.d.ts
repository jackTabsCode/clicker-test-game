interface ReplicatedStorage {
	assets: Folder & {
		person: PVInstance
	}
	matterRemote: RemoteEvent
}
