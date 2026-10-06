import Button from './Button'
export default function EmptyState({ icon: Icon, title, text, actionLabel, actionTo }) {
  return (
    <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-10 text-center">
      {Icon && <Icon size={40} className="text-wheat" />}
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-bark">{text}</p>
      {actionTo && <Button to={actionTo} className="mt-2">{actionLabel}</Button>}
    </div>
  )
}
