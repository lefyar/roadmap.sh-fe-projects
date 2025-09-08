interface AddStoryProps {
    onClick: () => void
}

export default function AddStory(AddStoryProps: AddStoryProps) {
    const {onClick} = AddStoryProps
    return (
        <button onClick={onClick} className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2c2c2c] text-white border-2 border-[#505050] hover:bg-[#222222] transition-colors cursor-pointer">
            <span className="text-2xl">+</span>
        </button>
    );
}