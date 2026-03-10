import { useState, useEffect, useCallback } from "react";
import type { Task } from "../../../features/task/task";
import { getTasks } from "../../../features/task/api";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]); //tasks 상태관리
    const [isLoading, setIsLoading] = useState(true); //로딩 상태관리

    const fetchTasks = useCallback(async () => { //데이터 목록을 불러오기
        setIsLoading(true); // 로딩 실행
        try {
            const data = await getTasks(); // API 호출로 데이터 받기 시도
            setTasks(data); // 받은 데이터로 tasks 상태 갱신 → 이 훅을 쓰는 컴포넌트가 다시 그리면서 목록이 보임
        } catch {
            setTasks([]); // 오류 나면 tasks를 빈 배열로 설정 (화면에 빈 목록 표시)
        } finally {
            setIsLoading(false); // 위의 작업이 완료되면 로딩 끝냄
        }
    }, []);

    // useEffect: 부수효과 제어. 여기서의 부수효과 = "서버에서 목록 가져오기".
    // 컴포넌트가 화면에 처음 붙을 때(마운트) 한 번 fetchTasks() 실행해서 목록을 불러옴.
    // 의존성 [fetchTasks]: fetchTasks가 바뀌면 다시 실행 (지금은 fetchTasks가 고정이라 마운트 시 1회만 실행됨)
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // refetch를 두는 이유: 마운트 시에만 자동으로 한 번 불러오고, 그 뒤에는 "다시 불러오기"가 필요할 때가 있음.
    // refetch의 역할: 이 훅을 쓰는 쪽에서 refetch()를 호출하면 서버에서 목록을 다시 가져와 tasks를 갱신함.
    // 예) 새 태스크 추가 후 목록 갱신, 새로고침 버튼 클릭, 다른 페이지 갔다 와서 최신 목록 보기
    return { tasks, isLoading, refetch: fetchTasks };
    //       ↑ 데이터    ↑ 로딩     ↑ 이름: 실제함수
}