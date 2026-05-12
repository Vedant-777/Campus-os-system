import LabCard from './LabCard'

export default function LabGrid({ labs, onBook }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {labs.map((lab, index) => (
        <div key={lab.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
          <LabCard lab={lab} onBook={onBook} />
        </div>
      ))}
    </div>
  )
}
