// Zustand에서 create 함수를 가져온다.
// create는 "전역 상태를 만드는 함수"라고 생각하면 된다.
import { create } from 'zustand'

// 우리가 정의한 Task 타입을 가져온다.
// (Task는 업무 하나의 데이터 구조)
import type { Task } from './task'


/*
    이 store가 "기억해야 할 상태" 정의

    TaskState는
    - tasks 배열을 가지고 있다.
    - 즉, 여러 개의 Task를 저장한다.
*/
interface TaskState {
    tasks: Task[]
}


/*
    이 store가 "할 수 있는 행동" 정의

    TaskActions는
    - task를 추가할 수 있고
    - 특정 task를 수정할 수 있고
    - 특정 task를 삭제할 수 있다.
*/
interface TaskActions {
  // 새로운 Task 하나를 추가
    addTask: (task: Task) => void

  // id로 특정 task를 찾아서 일부 필드만 수정
  // Partial<Task>는 Task의 모든 속성을 선택적으로 만든 타입
    updateTask: (id: string, updated: Partial<Task>) => void

  // id로 특정 task를 삭제
    removeTask: (id: string) => void
}


/*
    실제 store 생성

    create<TaskState & TaskActions>

    이 store는
    - TaskState(상태)
    - TaskActions(행동)

    둘을 합친 객체를 반환해야 한다는 의미
*/
// 객체를 반환하는 화살표 함수
export const useTaskStore = create<TaskState & TaskActions>(
  // create는 내부적으로 set 함수를 넘겨준다.
  // set은 "상태를 바꾸는 함수"다.
    (set) => ({

        /*
        초기 상태 정의
        처음에는 task가 아무것도 없다.
        */
        tasks: [],


        /*
        task 추가 함수

        1. 현재 상태(state)를 받아온다.
        2. 기존 tasks 배열을 복사한다.
        3. 새로운 task를 뒤에 붙인다.
        4. 새로운 객체를 반환한다.
        */
        addTask: (task) =>
            set((state) => ({
                tasks: [...state.tasks, task],
        })),



        /*
        task 수정 함수

        1. 모든 tasks를 map으로 순회한다.
        2. id가 일치하는 task를 찾는다.
        3. 기존 task를 복사하고(...task)
        4. updated에 들어온 값으로 덮어쓴다(...updated)
        5. 일치하지 않는 task는 그대로 둔다.
        */
        updateTask: (id, updated) =>
            set((state) => ({
                tasks: state.tasks.map((task) =>
                task.id === id
                    ? { ...task, ...updated } // 일부만 수정
                    : task // 해당 안 되면 그대로
                ),
        })),



    /*
        task 삭제 함수

        1. filter로 순회한다.
        2. id가 같은 task는 제거한다.
        3. 나머지만 남긴다.
        */
        removeTask: (id) =>
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
        })),

    })
)