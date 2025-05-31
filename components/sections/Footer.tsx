import SubTitleLine from "../ui/SubTitleLine";

export default function Footer() {
  return (
    <div>
      <div className="mx-auto px-[16px] md:px-[40px]">
        <SubTitleLine title="" />
        <div className="flex justify-between flex-col gap-[30px] md:flex-row md:gap-[0px]">
          <div className="block md:hidden">
            <img src="/assets/logo/BBR-Group-Logo-Footer.svg" alt="" />
          </div>
          <div className="space-y-[10px]">
            <p className="small">
              102 George St, The Rocks NSW 2000, Australia
            </p>
            <p className="small">© Copyright 2025 BBR Group Australia</p>
            <div className="flex gap-[16px]">
              <p className="small">Cookies</p>
              <p className="small">Privacy Policy</p>
            </div>
          </div>
          <div className="max-w-[228px] max-h-[20px] flex gap-[24px]">
            <img src="/assets/icons/Event-Icon.svg" alt="" />
            <img src="/assets/icons/PR-Icon.svg" alt="" />
            <img src="/assets/icons/Digital-Icon.svg" alt="" />
            <img src="/assets/icons/LinkedIn-Icon.svg" alt="" />
            <img src="/assets/icons/Instagram-Icon.svg" alt="" />
            <img src="/assets/icons/YouTube-Icon.svg" alt="" />
          </div>
          <div className="md:block hidden">
            <img src="/assets/logo/BBR-Group-Logo-Footer.svg" alt="" />
          </div>
        </div>
        <img
          className="mt-[50px] md:mt-[130px]"
          src="/assets/logo/BBR-Group-Text-Mask.svg"
          alt=""
        />
      </div>
    </div>
  );
}
