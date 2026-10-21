import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className='flex-1 flex flex-col items-center py-8'>
            <div>
                <h1 className='text-2xl font-medium'>Iniciar Sesion</h1>
                <p className='text-base'>Bienvenido de vuelta</p>
            </div>
            <SignIn
                appearance={{
                    variables: {
                        colorBackground: '#0a0a0a',
                        colorPrimary: '#0f9d58',
                    },
                    elements: {
                        footer: { display: "none" },
                        cardBox: { boxShadow: "none", width: "350px" },
                        header: { display: "none" },
                        socialButtonsBlockButton: {
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            borderColor: '#e5e7eb',
                            '&:hover': {
                                backgroundColor: '#f9fafb',
                            }
                        },
                        formFieldLabel: {
                            color: '#ffffff',
                        },

                        dividerText: {
                            color: '#ffffff',
                        },
                        dividerLine: {
                            backgroundColor: '#ffffff',
                        },

                    }
                }}
            />

        </div>
    )
}