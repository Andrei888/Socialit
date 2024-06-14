import { FC } from "react";

// components
import { Styled } from "./FilesBlock.styled";
import { FileObj } from "@app/models/file";
import background from "../../images/file-placeholder.png";

interface FilesBlockProps {
  files: FileObj[] | null;
}
const FilesBlock: FC<FilesBlockProps> = ({ files }) => {
  return (
    <Styled.Wrapper>
      {files?.map((file: FileObj, idx) => {
        return (
          <Styled.CustomCol span={6} key={idx}>
            <a href={file.url} target="_blank" rel="noreferrer">
              <Styled.ImageBlock
                style={{
                  backgroundImage: `url(${
                    file.type.includes("image") ? file.url : background
                  })`,
                }}
              ></Styled.ImageBlock>
            </a>
            <div>{file.name || file.type}</div>
          </Styled.CustomCol>
        );
      })}
    </Styled.Wrapper>
  );
};

export default FilesBlock;
