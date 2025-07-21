
type Props = {
  data: any;
};

const LivePreview = ({ data }: Props) => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
      <div
        className="bg-[#1e1e2f] text-green-300 font-mono p-4 rounded-lg 
        shadow-inner overflow-x-auto text-sm leading-relaxed whitespace-pre text-left"
      >
        <code>{JSON.stringify(data, null, 2)}</code>
      </div>
    </div>
  );
};

export default LivePreview;

