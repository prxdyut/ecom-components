import QRScan from "qrscan";

export default function Scanner() {
  return (
    <>
      <QRScan onFind={() => console.log("scan")} />
    </>
  );
}
