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

enum Status{
    PASSED,FAILED,IN_PROGRESS,SKIPPED
}