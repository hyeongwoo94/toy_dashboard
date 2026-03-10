export type TaskStatus = 'request' | 'in-progress' | 'review' | 'done'
export type TaskImportStatus = 'low' | 'medium' | 'high'

export interface Task {
    id:string                               // 테스크 아이디
    title:string                            // 테스크 제목
    createdDay:string                       //테스크 작성일
    doneDay?:string                          //태스크 마감일
    description?:string                      // 테스크 내용
    importStatus?:TaskImportStatus            //테스크 중요도
    status?: TaskStatus                      //테스크 상태
    authorId:string                         //테스크 작성자
    assigneeId:string                       //테스크 담장자
}