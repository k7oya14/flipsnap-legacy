import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function InterceptedPageAsModal() {
  return (
    <Dialog open>
      <InterceptedDialogContent className="h-1/2 w-1/2 rounded-lg">
        <h1>Intercepted page as modal</h1>
        <p>
          This page is opened as a modal. It is not a separate page, but a
          component that is opened as a modal.
        </p>
        <input type="text" className="border-2 border-gray-600" />
      </InterceptedDialogContent>
    </Dialog>
  );
}
