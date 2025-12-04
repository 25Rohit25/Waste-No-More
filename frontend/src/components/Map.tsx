export default function Map({ donations }: { donations: any[] }) {
    return (
        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center min-h-[400px]">
            <div className="text-center p-4">
                <p className="text-gray-500 font-semibold">Google Map Integration</p>
                <p className="text-sm text-gray-400">
                    (Requires valid API Key in .env.local)
                </p>
                <p className="mt-2 text-xs text-gray-400">
                    {donations.length} donations pinned nearby.
                </p>
            </div>
        </div>
    );
}
