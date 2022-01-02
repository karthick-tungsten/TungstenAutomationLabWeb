export interface AllProjectsResponse {
    metaData: {
        projectCount: number,
        message: String,
    }, projectList: projectList[]
}

export interface projectList {
    projectDetails: {
        projectId: String,
        projectName: String
    },
    ownerDetails: {
        ownerId: String,
        ownerName: String
    }
}
