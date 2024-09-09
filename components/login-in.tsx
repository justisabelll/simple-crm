import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';
import { FaGoogle } from 'react-icons/fa';

const description =
  'A dead simple CRM for managing your customers and leads. Nothing more, nothing less.';

export function Login() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Hello.</h1>
            <p className="text-balance text-muted-foreground">
              Please sign in to access your account with Google.
            </p>
          </div>
          <div className="grid gap-4">
            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/dashboard' });
              }}
            >
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
              >
                <FaGoogle className="mr-2" />
                Sign in with Google
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden flex-1 bg-primary lg:block text-white">
        <div className="flex items-center justify-center h-full ">
          <p className="absolute bottom-0 mb-4 px-4 italic font-light">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
