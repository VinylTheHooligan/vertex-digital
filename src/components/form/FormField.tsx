type FormFieldProps = {
    label: string,
    id: string,
    name: string,
    type?: string,
    error?: string[],
    rows?: number,
    accept?: string,
}

export default function FormFieldProps({ label, id, name, type, error, rows, accept }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor={id}>{label} :</label>
            {rows ? (
                <textarea id={id} name={name} rows={rows} required />
            ) : (
                <div className="input-wrapper">
                    <input id={id} name={name} type={type ?? 'text'} accept={accept} required />
                </div>
            )}
            {error && <span className="text-red-800">{error[0]}</span>}
        </div>
    )
}