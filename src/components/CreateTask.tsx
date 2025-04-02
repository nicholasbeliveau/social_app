"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2Icon, SendIcon } from "lucide-react";
import { createTask } from "@/actions/tasks.action";

function CreateTask() {

  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async () => {
    if ( !content.trim() ) return;    // if somehow the content is blank don't do anything

    setIsPosting( true );
    try {
      const result = await createTask( content );

      if ( result?.success ) {
        setContent("");
      }

      console.log( "Test: " + result );
    } catch ( error ) {
      console.error( error );
    } finally {
      setIsPosting( false );
    }
  }

  return( 
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Textarea
            placeholder="What is the task?"
            className="focus-visible:ring-0 p-4 text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
          />
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <Button
            className="flex items-center"
            onClick={handleSubmit}
            disabled={(!content.trim()) || isPosting}
          >
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <SendIcon className="size-4 mr-2" />
                Post
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreateTask;