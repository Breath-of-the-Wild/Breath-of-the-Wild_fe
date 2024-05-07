import React from 'react';
import {
    Typography,
    Button,
    Input,
    Textarea,
    Checkbox,
  } from "@material-tailwind/react";
  
const Question = () => {
    return (
        <div>
            
            <PageTitle section="문의사항" heading="문의하실 내용이 있으신가요?">
            문의하실 내용이 있으면 연락주세요
          </PageTitle>
            <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="이름" />
              <Input variant="outlined" size="lg" label="이메일" />
            </div>
            <Textarea variant="outlined" size="lg" label="내용" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  개인정보 이용방침
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;동의
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              전송
            </Button>
          </form>
        </div>
    );
};

export default Question;