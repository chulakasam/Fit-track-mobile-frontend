export default class WorkOut {
    id!: string;
    workOutType!:string;
    duration!:string;
    goal!:string;
    note!:string;

    constructor(workOutType:string,duration:string,goal:string,note:string) {
        this.workOutType = workOutType;
        this.duration = duration;
        this.goal = goal;
        this.note = note;
    }
}