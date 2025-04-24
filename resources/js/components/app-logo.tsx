import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <AppLogoIcon className="size-7 bg-amber-50 fill-current text-white" />
            </div>
            <div className="grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">SanPlast</span>
            </div>
        </>
    );
}
