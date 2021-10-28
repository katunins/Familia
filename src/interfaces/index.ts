export interface ISocialButtonComponent {
    onPress: () => void
}

export interface ILoginData {
    email: string,
    password: string
}

export interface ISignUpData extends ILoginData {
    name: string
}
