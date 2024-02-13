import UploadedFile from "./UploadedFile"

// fileName, uploadedBy, uploadedOn, noOfRows
const UploadedFiles = ({ files, data }) => {
    console.log('files!!', data)
    return (
        <div className="grid grid-cols-2 gap-6">
            <UploadedFile files={files} uploadHeading='All TPL File(s)' uploadedFiledata={data} />
            <UploadedFile files={files} uploadHeading='People Master File(s)' uploadedFiledata={data} />
            <UploadedFile files={files} uploadHeading='Uncommon Activity Master File(s)' uploadedFiledata={data} />
        </div>
    )
}

export default UploadedFiles