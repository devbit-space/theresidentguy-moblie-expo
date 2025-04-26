interface ReducerObject {
    type: string
    payload: any
}

interface InitStateObject {
    access_token: string
    userEmail: string
    verifyCodeType: string
    authType: string
    user: { id: string, email: string, fullName: string, pfp: string, isPasswordSet: boolean }
    isSharedScreen: boolean
    isLeaveInterview: {
        status: boolean
        link: string
    }
}

type GlobalContextType = [
    InitStateObject,

    {
        dispatch: (data: ReducerObject) => void
        storeData: (value: any) => void
    }
]
