export interface GetAllTestRunsResponse{
    responseDetails:ResponseDetails,
    testRuns:TestRuns[]
}

interface ResponseDetails{
    count:number,
    message:String
}

interface TestRuns{
    id:String,
    name:String,
    count:number,
    description:String,
    status:Status,
    total:number,
    passed:number,
    failed:number,
    skipped:number,
    rerun:boolean
    tags:[],
    createOn:String,
    lastUpdate:String
}

export enum Status{
    PASSED ='PASSED',
    FAILED = 'FAILED',
    IN_PROGRESS='IN_PROGRESS',
    SKIPPED='SKIPPED'
}