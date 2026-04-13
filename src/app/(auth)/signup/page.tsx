import Image from "next/image";
import Link from "next/link";
import { signupAction } from "@/lib/auth-actions";

type SignupPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "invalid_name") {
    return "Please enter a valid full name.";
  }
  if (error === "invalid_email") {
    return "Please provide a valid email address.";
  }
  if (error === "weak_password") {
    return "Password must be 8+ chars and include upper, lower, and number.";
  }
  return null;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const errorMessage = getErrorMessage(resolvedParams.error);

  const inputBaseClass =
    "min-h-[62px] w-full rounded-[10px] border border-white/12 bg-[rgba(2,3,10,0.88)] px-[22px] text-[clamp(16px,1.15vw,22px)] leading-none text-[#aba5aa] placeholder:text-[#959099] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3e5d4] max-[1000px]:min-h-[58px] max-[1000px]:text-[17px]";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-[32px] text-[#efe3d5] max-[640px]:p-[16px]">
      <Image
        src="/assets/login.png"
        alt="Architectural interior background"
        fill
        priority
        className="z-0 object-cover object-center"
      />
      <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_58%_28%,rgba(244,220,190,0.22),transparent_38%),radial-gradient(circle_at_18%_70%,rgba(110,80,54,0.24),transparent_44%),linear-gradient(180deg,rgba(4,6,12,0.52)_0%,rgba(4,5,9,0.72)_100%)]" />

      <div className="absolute left-[84px] top-[50px] z-2 font-['Times_New_Roman',serif] text-[clamp(42px,3.4vw,58px)] leading-none tracking-[-0.7px] text-[#e7dbcd] max-[1000px]:left-[30px] max-[1000px]:top-[34px] max-[1000px]:text-[42px] max-[640px]:left-[16px] max-[640px]:top-[22px] max-[640px]:text-[34px]">
        Brickyard
      </div>

      <Link
        href="/login"
        className="absolute right-[90px] top-[62px] z-2 text-[clamp(18px,1.2vw,26px)] font-medium leading-none text-[#e2d4c3] no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3e5d4] max-[1000px]:right-[30px] max-[1000px]:top-[44px] max-[1000px]:text-[20px] max-[640px]:right-[16px] max-[640px]:top-[30px] max-[640px]:text-[18px]"
      >
        Log In
      </Link>

      <section
        className="relative z-2 w-[min(620px,calc(100vw-64px))] rounded-[24px] border border-white/5 bg-[rgba(8,10,16,0.74)] px-[46px] pb-[42px] pt-[52px] shadow-[0_36px_90px_rgba(0,0,0,0.6)] backdrop-blur-[2px] max-[1000px]:w-[min(620px,calc(100vw-34px))] max-[1000px]:px-[20px] max-[1000px]:pb-[32px] max-[1000px]:pt-[40px] max-[640px]:w-full max-[640px]:rounded-[18px] max-[640px]:px-[14px] max-[640px]:pb-[26px] max-[640px]:pt-[34px]"
        aria-label="Sign up form"
      >
        <h1 className="m-0 text-center font-['Times_New_Roman',serif] text-[clamp(42px,3.2vw,56px)] font-medium leading-[1.02] tracking-[-0.7px] text-[#e8dbc9] max-[640px]:text-[clamp(34px,7vw,46px)]">
          Create Your Account
        </h1>
        <p className="mb-[34px] mt-[16px] text-center text-[clamp(15px,0.95vw,19px)] leading-[1.2] text-[#a39ca0] max-[640px]:mb-[26px] max-[640px]:text-[14px]">
          Begin your collaboration with Brickyard Architects.
        </p>

        {errorMessage ? (
          <p
            className="mb-[16px] rounded-[10px] border border-[#f3e5d4]/20 bg-black/25 px-[14px] py-[10px] text-center text-[14px] text-[#d8c9b8]"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}

        <form action={signupAction} className="flex flex-col gap-[18px] max-[640px]:gap-[14px]">
          <label htmlFor="name" className="sr-only">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            className={inputBaseClass}
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
          />

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className={inputBaseClass}
            autoComplete="email"
            required
          />

          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className={inputBaseClass}
            autoComplete="new-password"
            required
            minLength={8}
          />

          <p className="mb-[6px] mt-[-2px] text-[clamp(13px,0.85vw,16px)] leading-[1.2] text-[#8d868e] max-[640px]:mb-[4px] max-[640px]:text-[13px]">
            Use at least 8 characters.
          </p>

          <button
            type="submit"
            className="min-h-[62px] w-full cursor-pointer rounded-[10px] border-0 bg-[#e4d8cc] text-[clamp(18px,1.2vw,24px)] font-semibold leading-none text-[#262429] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3e5d4] max-[1000px]:min-h-[58px]"
          >
            Create Account
          </button>
        </form>

        <p className="mb-0 mt-[30px] text-center text-[clamp(16px,1vw,22px)] leading-[1.2] text-[#a89fa6] max-[640px]:mt-[24px] max-[640px]:text-[16px]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#d6c3a8] no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3e5d4]"
          >
            Log In
          </Link>
        </p>

        <p className="mb-0 mt-[24px] text-center text-[clamp(13px,0.85vw,17px)] leading-[1.3] text-[#8f8790] max-[640px]:mt-[20px] max-[640px]:text-[13px]">
          By creating an account, you agree to our{" "}
          <Link
            href="#"
            className="font-bold text-[#cdb79a] no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3e5d4]"
          >
            project terms.
          </Link>
        </p>
      </section>
    </main>
  );
}
