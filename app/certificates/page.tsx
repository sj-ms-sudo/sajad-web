import CertificatesCabinet from "@/components/certificates-page/CertificatesCabinet";
import CertificatesHeader from "@/components/certificates-page/CertificatesHeader";
import Footer from "@/components/Home/Footer/Footer";

export default function Certificates(){
    return(
        <>
            <CertificatesHeader/>
            <CertificatesCabinet/>
            <Footer/>
        </>
    )
}