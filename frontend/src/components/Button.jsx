export function Button({label,onClick}){
    return <div>
        <button onClick={onClick} type="button" className="w-full text-white bg-gray-900 rounded-md px-4 py-2">{label}</button>
        </div>
    
}