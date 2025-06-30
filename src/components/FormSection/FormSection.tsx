interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({
  title,
  children,
  className = '',
}: FormSectionProps) => (
  <div className={`mb-8 rounded-lg shadow `}>
    <h2 className=" mb-2 bg-[#F4F4F4] text-[#6F6C6A] text-lg font-medium p-4">
      {title}
    </h2>
    <div className={`${className} p-3`}>{children}</div>
  </div>
);
